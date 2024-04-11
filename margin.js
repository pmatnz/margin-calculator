const costInput = document.getElementById("cost-input");
const inputList = document.getElementById("inputValueList");
const errorMessage = document.getElementById("error-message"); // Reference to error message element
const clearButton = document.getElementById("clear-button");
const marginPercentageInput = document.getElementById("input-percentage");

const marginValuesTest = {
	"10% Margin": 0.9,
	"15% Margin": 0.85,
	"20% Margin": 0.8,
	"25% Margin": 0.75,
	"30% Margin": 0.7,
	"35% Margin": 0.65,
	"40% Margin": 0.6,
	"45% Margin": 0.55,
};

costInput.addEventListener("input", function () {
	const convertToInt = parseFloat(costInput.value); // Convert input value to float
	const hasComma = /\,/.test(costInput.value); //regex to check for a comma an test aganist the input
	if (costInput.value.trim() === "") {
		// .trim to remove whitespaces
		// Check if input is empty
		// Clear the input list and error message
		inputList.innerHTML = "";
		errorMessage.innerHTML = "";
	} else if (!hasComma && !isNaN(convertToInt)) {
		// Check if input is a valid number
		inputList.innerHTML = ""; // Clear previous values
		for (const percentage in marginValuesTest) {
			// Loop through each percentage value in the object
			if (marginValuesTest.hasOwnProperty(percentage)) {
				// Check if the property is a direct property of the object
				const marginFactor = marginValuesTest[percentage]; // Get the margin factor for the percentage
				const newValue = convertToInt / marginFactor; // Calculate the new value
				inputList.innerHTML += `<li>${percentage}: $${newValue.toFixed(
					2
				)}</li>`; // Append the new value
			}
		}
		// Clear the error message if it was previously shown
		errorMessage.innerHTML = "";
	} else {
		// Display an error message if the input is not a valid number
		errorMessage.innerHTML = "<p>Please enter numbers only</p>";
	}
});

marginPercentageInput.addEventListener("input", function () {
	// Get the original number inputted by the user (Cost Price)
	const originalNumber = parseFloat(costInput.value);
	// Get the percentage margin inputted by the user
	const marginPercentage =
		marginPercentageInput.value.trim() !== ""
			? parseFloat(marginPercentageInput.value)
			: null;

	if (marginPercentage !== null && isNaN(marginPercentage)) {
		// Display an error message if the input is not a valid number
		errorMessage.innerHTML = "<p>Margin percentage must be a number</p>";
		return;
	} else {
		// Clear any previous error message if present
		errorMessage.innerHTML = "";
	}

	// Check if both cost price and margin percentage are empty
	if (
		costInput.value.trim() === "" &&
		(marginPercentage === null || isNaN(marginPercentage))
	) {
		// Clear the input list
		inputList.innerHTML = "";
		// Clear any previous error message
		errorMessage.innerHTML = "";
		return;
	}

	// Check if the margin percentage input is empty or not a number
	if (marginPercentage === null) {
		// If it's empty, generate the default percentage values based on the cost price
		inputList.innerHTML = ""; // Clear previous values
		for (const percentage in marginValuesTest) {
			// Loop through each percentage value in the object
			if (marginValuesTest.hasOwnProperty(percentage)) {
				// Check if the property is a direct property of the object
				const marginFactor = marginValuesTest[percentage]; // Get the margin factor for the percentage
				const newValue = originalNumber / marginFactor; // Calculate the new value
				inputList.innerHTML += `<li>${percentage}: $${newValue.toFixed(
					2
				)}</li>`; // Append the new value
			}
		}
	} else {
		// Calculate the new value with the user-specified margin percentage
		const marginAmount = (100 - marginPercentage) / 100; // this will give the .xx value to / cost by
		const newValue = originalNumber / marginAmount;
		const roundedValue = newValue.toFixed(2);
		inputList.innerHTML = `<li>${marginPercentage}% Margin: $${roundedValue}</li>`;
	}
});

clearButton.addEventListener("click", function () {
	// Clear the HTML content of the input list
	inputList.innerHTML = "";
	// Clear the value of the cost input field
	costInput.value = "";
	// Clear the value of the margin percentage input field
	marginPercentageInput.value = "";
	// Clear any error message
	errorMessage.innerHTML = "";
});

costInput.addEventListener("mouseover", () => {
	console.log("value");
});
