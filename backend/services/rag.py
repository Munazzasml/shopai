import os
from openai import OpenAI
from qdrant_client import QdrantClient
from dotenv import load_dotenv

load_dotenv()

openrouter_key = os.getenv("OPENROUTER_API_KEY")
qdrant_url = os.getenv("QDRANT_URL")
qdrant_api_key = os.getenv("QDRANT_API_KEY")

if not openrouter_key:
    raise ValueError("OPENROUTER_API_KEY is missing in .env")

if not qdrant_url:
    raise ValueError("QDRANT_URL is missing in .env")

if not qdrant_api_key:
    raise ValueError("QDRANT_API_KEY is missing in .env")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=openrouter_key,
)

qdrant = QdrantClient(
    url=qdrant_url,
    api_key=qdrant_api_key,
)

def get_ai_response(query: str, history: list) -> str:
    print("\n========== CHAT DEBUG START ==========")
    print("User query:", query)

    # 1. Create embedding
    embedding_response = client.embeddings.create(
        model="openai/text-embedding-3-small",
        input=query
    )
    query_vector = embedding_response.data[0].embedding
    print("Embedding created successfully.")

    # 2. Search in Qdrant
    try:
        search_results = qdrant.search(
            collection_name="products",
            query_vector=query_vector,
            limit=3
        )
        print(f"Qdrant search successful. Results found: {len(search_results)}")
    except Exception as e:
        print("Qdrant search error:", str(e))
        raise

    context_items = []

    for result in search_results:
        payload = result.payload
        print("Matched product:", payload)
        context_items.append(
            f"Name: {payload.get('name')}\n"
            f"Category: {payload.get('category')}\n"
            f"Price: ${payload.get('price')}\n"
            f"Description: {payload.get('description')}"
        )

    if context_items:
        product_context = "\n\n".join(context_items)
    else:
        product_context = "No matching products found in inventory."

    print("Context sent to model:")
    print(product_context)

    # 3. Build messages
    messages = [
        {
            "role": "system",
            "content": (
                "You are ShopAI, a helpful AI shopping assistant.\n"
                "Answer ONLY using the provided product inventory context.\n"
                "If relevant products exist, recommend them clearly.\n"
                "If no relevant products are found, say so politely.\n"
                "Keep answers helpful, short, and product-focused.\n\n"
                f"PRODUCT INVENTORY CONTEXT:\n{product_context}"
            ),
        }
    ]

    for msg in history:
        messages.append({
            "role": msg["role"],
            "content": msg["content"]
        })

    messages.append({
        "role": "user",
        "content": query
    })

    # 4. Chat completion
    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=messages,
        temperature=0.3
    )

    answer = response.choices[0].message.content
    print("Model answer:", answer)
    print("=========== CHAT DEBUG END ===========\n")

    return answer