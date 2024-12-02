document.getElementById('loan-form').addEventListener('submit', function(e) {
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show loader
    // document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1000); // Simulate a loading time of 1 second

    e.preventDefault();
});

function calculateResults() {
    // UI variables
    const amount = document.getElementById('amount').value;
    const interest = document.getElementById('interest').value;
    const years = document.getElementById('years').value;

    // Calculate monthly interest rate
    const principal = parseFloat(amount);
    const calculatedInterest = parseFloat(interest) / 100 / 12;
    const calculatedPayments = parseFloat(years) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments); // (1 + r)^n
    const monthly = (principal*x*calculatedInterest)/(x-1); // P[r(1+r)^n]/[(1+r)^n-1]

    // Check if monthly is a finite number
    if (isFinite(monthly)) {
        // Show results
        document.getElementById('monthly-payment').value = monthly.toFixed(2);
        document.getElementById('total-payment').value = (monthly * calculatedPayments).toFixed(2);
        document.getElementById('total-interest').value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Hide loader
        // document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
    } else {
        showError('Please check your numbers');
    }
}

// Show error
function showError(error) {
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Hide loader
    // document.getElementById('loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Create error message
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
    document.querySelector('.alert').remove();
}