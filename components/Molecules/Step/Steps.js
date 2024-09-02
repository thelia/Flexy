export default function StepsFunction() {
  const checkoutSteps = document.querySelector('.Steps');
  if (checkoutSteps) {
    const stepsContent = document.querySelectorAll('.step-content');
    const stepsProgressBar = document.querySelectorAll('.Step');

    let currentStep = 0;

    function showStep(index) {
      stepsContent.forEach((step, idx) => {
        step.classList.toggle('active', idx === index);
      });
      stepsProgressBar.forEach((step, idx) => {
        step.classList.toggle('active', idx === index);
      });
    }

    function nextStep() {
      if (currentStep < stepsContent.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    }

    function prevStep() {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }

    document.querySelectorAll('.next-btn').forEach((button) => {
      button.addEventListener('click', nextStep);
    });

    document.querySelectorAll('.prev-btn').forEach((button) => {
      button.addEventListener('click', prevStep);
    });

    stepsProgressBar.forEach((circle, idx) => {
      circle.addEventListener('click', () => {
        currentStep = idx;
        showStep(currentStep);
      });
    });

    showStep(currentStep);
  }
}
