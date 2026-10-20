from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
from typing import List, Dict


class SubscriptionRecommender:
	def __init__(self):
		self.vectorizer = TfidfVectorizer(max_features=100)
		self.subscription_features = None
		self.is_fitted = False

	def fit(self, subscriptions: List[Dict]):
		"""Fit the recommender with existing subscriptions"""
		descriptions = [
			f"{s.get('name', '')} {s.get('provider', '')} {s.get('category', '')}"
			for s in subscriptions
		]
		self.subscription_features = self.vectorizer.fit_transform(descriptions)
		self.is_fitted = True

	def recommend(self, user_subscriptions: List[Dict],
				  all_subscriptions: List[Dict], top_n: int = 5) -> List[Dict]:
		"""Recommend similar subscriptions based on user's current ones"""
		if not self.is_fitted:
			self.fit(all_subscriptions)

		user_text = " ".join([
			f"{s.get('name', '')} {s.get('provider', '')}"
			for s in user_subscriptions
		])

		user_vector = self.vectorizer.transform([user_text])
		similarities = cosine_similarity(user_vector, self.subscription_features)[0]

		top_indices = similarities.argsort()[-top_n:][::-1]

		recommendations = []
		for idx in top_indices:
			sub = all_subscriptions[idx]
			recommendations.append({
				**sub,
				"similarity_score": float(similarities[idx])
			})

		return recommendations