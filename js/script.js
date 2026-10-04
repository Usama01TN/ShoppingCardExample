document.addEventListener('DOMContentLoaded', () => {
  const totalElement = document.querySelector('.total');
  const productsContainer = document.querySelector('.list-products');

  function updateTotal() {
    let total = 0;

    document.querySelectorAll('.card-body > .card').forEach(card => {
      const price = parseFloat(card.querySelector('.unit-price').textContent.replace('$', '').trim());
      const quantity = parseInt(card.querySelector('.quantity').textContent, 10);
      total += price * quantity;
    });

    totalElement.textContent = `${total} $`;
  }

  productsContainer.addEventListener('click', event => {
    const button = event.target.closest('i');
    if (!button) return;

    const card = button.closest('.card');
    if (!card) return;

    const quantityElement = card.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent, 10);

    if (button.classList.contains('fa-plus-circle')) {
      quantity++;
      quantityElement.textContent = quantity;
      updateTotal();
    }

    if (button.classList.contains('fa-minus-circle')) {
      if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
        updateTotal();
      }
    }

    if (button.classList.contains('fa-trash-alt')) {
      card.closest('.card-body').remove();
      updateTotal();
    }

    if (button.classList.contains('fa-heart')) {
      button.classList.toggle('liked');
      button.style.color = button.classList.contains('liked') ? 'red' : 'black';
    }
  });

  updateTotal();
});
