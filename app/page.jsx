'use client'
import { useState } from 'react'

export default function BMICalculator() {
	const [weight, setWeight] = useState('')
	const [height, setHeight] = useState('')
	const [bmi, setBmi] = useState(null)

	// Diet chart based on BMI categories
	const dietChart = {
		underweight: {
			title: 'Underweight (BMI < 18.5)',
			advice:
				'Gain weight with calorie-dense foods like nuts, avocados, and healthy proteins.',
			meals: [
				{
					time: 'Breakfast',
					food: 'Whole-grain toast, scrambled eggs, banana, whole milk.',
				},
				{
					time: 'Lunch',
					food: 'Grilled chicken, quinoa, and roasted vegetables.',
				},
				{
					time: 'Dinner',
					food: 'Salmon or tofu, sweet potatoes, and broccoli.',
				},
			],
		},
		normal: {
			title: 'Normal Weight (BMI 18.5–24.9)',
			advice:
				'Maintain your weight with a balanced diet of fruits, vegetables, whole grains, and lean proteins.',
			meals: [
				{ time: 'Breakfast', food: 'Oatmeal with fresh fruits and nuts.' },
				{
					time: 'Lunch',
					food: 'Grilled chicken/legumes, brown rice, and a salad.',
				},
				{
					time: 'Dinner',
					food: 'Baked fish or tofu with stir-fried vegetables.',
				},
			],
		},
		overweight: {
			title: 'Overweight (BMI 25–29.9)',
			advice:
				'Lose weight with portion control, low-calorie meals, and high-fiber foods.',
			meals: [
				{
					time: 'Breakfast',
					food: 'Smoothie with spinach, berries, and protein powder.',
				},
				{
					time: 'Lunch',
					food: 'Grilled chicken breast, steamed vegetables, and quinoa.',
				},
				{
					time: 'Dinner',
					food: 'Grilled fish or lean meat with a side salad.',
				},
			],
		},
		obese: {
			title: 'Obese (BMI ≥ 30)',
			advice: 'Focus on weight loss with nutrient-dense, low-calorie meals.',
			meals: [
				{
					time: 'Breakfast',
					food: 'Boiled eggs with spinach and whole-grain toast.',
				},
				{
					time: 'Lunch',
					food: 'Grilled chicken or fish, steamed broccoli, and cauliflower.',
				},
				{ time: 'Dinner', food: 'Lentil soup with mixed greens.' },
			],
		},
	}

	const calculateBMI = () => {
		if (!weight || !height) {
			alert('Please enter both weight and height.')
			return
		}

		const heightInMeters = height / 100
		const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1)
		setBmi(bmiValue)
	}

	// Determine the BMI category
	const getDietPlan = () => {
		if (bmi < 18.5) return dietChart.underweight
		if (bmi >= 18.5 && bmi <= 24.9) return dietChart.normal
		if (bmi >= 25 && bmi <= 29.9) return dietChart.overweight
		if (bmi >= 30) return dietChart.obese
		return null
	}

	const dietPlan = bmi ? getDietPlan() : null
	function BmiColor({ bmi }) {
		if (bmi <= 18.5)
			return <span className="text-red-400 text-2xl font-bold">{bmi}</span>
		if (bmi >= 18.5 && bmi <= 24.9)
			return <span className="text-green-600 text-2xl font-bold">{bmi}</span>
		if (bmi >= 25 && bmi <= 29.9)
			return <span className="text-yellow-600 text-2xl font-bold">{bmi}</span>
		if (bmi >= 30)
			return <span className="text-red-600 text-2xl font-bold">{bmi}</span>
	}

	return (
		<div className="max-w-6xl mx-auto p-6 bg-white shadow-md shadow-gray-400 rounded-md mt-5">
			<h1 className="text-2xl font-bold text-center mb-4">
				Diet Chart Generator
			</h1>
			<div className="mb-4">
				<label className="block text-gray-700 font-medium mb-2">
					Weight (kg):
				</label>
				<input
					type="number"
					value={weight}
					onChange={e => setWeight(e.target.value)}
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 font-medium mb-2">
					Height (cm):
				</label>
				<input
					type="number"
					value={height}
					onChange={e => setHeight(e.target.value)}
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>
			<button
				onClick={calculateBMI}
				className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
			>
				Calculate BMI
			</button>
			{bmi ? (
				<div className="mt-6 p-4 bg-gray-100 rounded-md">
					<h2 className="text-lg font-bold">
						Your BMI: <BmiColor bmi={bmi} />
					</h2>
					<h2 className="text-lg font-bold">{dietPlan.title}</h2>
					<p className="text-gray-700 mt-2">{dietPlan.advice}</p>
					<h3 className="text-md font-semibold mt-4">Meals:</h3>
					<ul className="list-disc ml-6 mt-2">
						{dietPlan.meals.map((meal, index) => (
							<li key={index} className="text-gray-700">
								<span className="font-semibold">{meal.time}: </span>
								{meal.food}
							</li>
						))}
					</ul>
				</div>
			) : (
				<div>Please input your weight and height</div>
			)}
			   
		</div>
	)
}
