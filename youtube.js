document.querySelector('.menu-button').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
  });

function scrollNext() {
    document.getElementById('next').scrollIntoView({ behavior: 'smooth' });
  }
