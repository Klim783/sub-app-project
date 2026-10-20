from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np
import joblib
from typing import Dict, List


class ChurnPredictor:
	def __init__(self):
		self.model = RandomForestClassifier(n_estimators=100, random_state=42)
		self.scaler = StandardScaler()
		self.is_trained = False

	def prepare_features(self, data: List[Dict]) -> np.ndarray:
		"""Prepare features for churn prediction"""
		df = pd.DataFrame(data)

		# Feature engineering
		features = []
		for _, row in df.iterrows():
			feature_vector = [
				row.get('price', 0),
				1 if row.get('billing_cycle') == 'monthly' else 0,
				row.get('subscription_age_days', 0),
				row.get('payment_count', 0),
				row.get('total_spent', 0),
			]
			features.append(feature_vector)

		return np.array(features)

	def train(self, data: List[Dict], labels: List[int]):
		"""Train the churn prediction model"""
		X = self.prepare_features(data)
		y = np.array(labels)

		X_scaled = self.scaler.fit_transform(X)
		self.model.fit(X_scaled, y)
		self.is_trained = True

	def predict(self, data: List[Dict]) -> List[Dict]:
		"""Predict churn probability"""
		if not self.is_trained:
			raise ValueError("Model must be trained before prediction")

		X = self.prepare_features(data)
		X_scaled = self.scaler.transform(X)
		probabilities = self.model.predict_proba(X_scaled)[:, 1]

		return [
			{"churn_probability": float(prob), "at_risk": prob > 0.5}
			for prob in probabilities
		]

	def save_model(self, path: str):
		"""Save the trained model"""
		joblib.dump({
			'model': self.model,
			'scaler': self.scaler,
			'is_trained': self.is_trained
		}, path)

	def load_model(self, path: str):
		"""Load a trained model"""
		data = joblib.load(path)
		self.model = data['model']
		self.scaler = data['scaler']
		self.is_trained = data['is_trained']