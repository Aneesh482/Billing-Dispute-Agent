from google.cloud import firestore
from app.config import settings

db = firestore.Client(project=settings.GCP_PROJECT_ID)