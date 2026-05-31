import os
import sys
from openai import OpenAI
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from dotenv import load_dotenv

load_dotenv()

openrouter_key = os.getenv("OPENROUTER_API_KEY")
qdrant_url = os.getenv("QDRANT_URL")
qdrant_api_key = os.getenv("QDRANT_API_KEY")

if not openrouter_key:
    print("❌ OPENROUTER_API_KEY is missing in .env")
    sys.exit(1)

if not qdrant_url:
    print("❌ QDRANT_URL is missing in .env")
    sys.exit(1)

if not qdrant_api_key:
    print("❌ QDRANT_API_KEY is missing in .env")
    sys.exit(1)

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=openrouter_key,
)

qdrant = QdrantClient(
    url=qdrant_url,
    api_key=qdrant_api_key,
)

PRODUCTS = [
    {
        "id": "e1",
        "name": "ProBook X15 Laptop",
        "price": 1299.99,
        "description": "Ultra-slim 15-inch laptop with a powerful M-series processor, 16GB RAM, and all-day battery life.",
        "category": "Electronics",
    },
    {
        "id": "e2",
        "name": "Noise-Cancelling Headphones",
        "price": 249.50,
        "description": "Premium over-ear headphones with active noise cancellation, deep bass, and 30 hours of playtime.",
        "category": "Electronics",
    },
    {
        "id": "e3",
        "name": "Vanguard Smartwatch",
        "price": 199.00,
        "description": "Track your fitness, receive notifications, and monitor your heart rate with this sleek smartwatch.",
        "category": "Electronics",
    },
    {
        "id": "e4",
        "name": "Mirrorless Digital Camera",
        "price": 899.00,
        "description": "Capture stunning 4K video and high-resolution photos. Includes a versatile 18-55mm kit lens.",
        "category": "Electronics",
    },
    {
        "id": "f1",
        "name": "Classic Denim Jacket",
        "price": 89.99,
        "description": "A timeless vintage-wash denim jacket. Durable, comfortable, and pairs perfectly with almost any outfit.",
        "category": "Fashion",
    },
    {
        "id": "f2",
        "name": "Urban Runner Sneakers",
        "price": 120.00,
        "description": "Lightweight, breathable mesh sneakers designed for both city commutes and intense gym sessions.",
        "category": "Fashion",
    },
    {
        "id": "f3",
        "name": "Polarized Aviator Sunglasses",
        "price": 55.00,
        "description": "Stylish metal-frame aviators with UV400 polarized lenses to protect your eyes from harsh glare.",
        "category": "Fashion",
    },
    {
        "id": "f4",
        "name": "Leather Weekend Duffel",
        "price": 150.00,
        "description": "Spacious genuine leather duffel bag, perfect for short trips and weekend getaways.",
        "category": "Fashion",
    },
    {
        "id": "h1",
        "name": "Artisan Espresso Machine",
        "price": 350.00,
        "description": "Brew barista-quality espresso at home. Features a built-in milk frother and precise temperature control.",
        "category": "Home",
    },
    {
        "id": "h2",
        "name": "Minimalist Desk Lamp",
        "price": 45.00,
        "description": "Sleek LED desk lamp with adjustable brightness levels and color temperatures. Includes wireless charger.",
        "category": "Home",
    },
    {
        "id": "h3",
        "name": "Chunky Knit Throw Blanket",
        "price": 65.00,
        "description": "Incredibly soft and warm hand-knitted throw blanket. Adds a cozy, rustic touch to any room.",
        "category": "Home",
    },
    {
        "id": "h4",
        "name": "Ceramic Indoor Planter",
        "price": 32.50,
        "description": "Modern matte ceramic planter with a drainage hole and matching saucer. Perfect for house plants.",
        "category": "Home",
    },
]

def main():
    print("🚀 Starting Qdrant seed...")

    # Create collection if it does not exist
    existing_collections = qdrant.get_collections().collections
    collection_names = [collection.name for collection in existing_collections]

    if "products" not in collection_names:
        print("Creating 'products' collection...")
        qdrant.create_collection(
            collection_name="products",
            vectors_config=VectorParams(
                size=1536,
                distance=Distance.COSINE
            ),
        )
    else:
        print("'products' collection already exists.")

    points = []

    for index, product in enumerate(PRODUCTS, start=1):
        print(f"Embedding product: {product['name']}")

        text_to_embed = (
            f"Name: {product['name']}. "
            f"Category: {product['category']}. "
            f"Description: {product['description']}. "
            f"Price: {product['price']}"
        )

        embedding_response = client.embeddings.create(
            model="openai/text-embedding-3-small",
            input=text_to_embed
        )

        vector = embedding_response.data[0].embedding

        point = PointStruct(
            id=index,
            vector=vector,
            payload=product
        )
        points.append(point)

    print(f"Uploading {len(points)} products to Qdrant...")
    qdrant.upsert(
        collection_name="products",
        points=points
    )

    print("✅ Qdrant seeding completed successfully!")

    # verify count
    count_result = qdrant.count(
        collection_name="products",
        exact=True
    )
    print(f"📦 Total products in collection: {count_result.count}")

if __name__ == "__main__":
    main()