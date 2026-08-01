import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51TzWqKJasE724jjz7pd5kTmnfylaw1udM9WxxqVzCJvjAo6pfvx6pO5My7H2CFdpom8CmZfZ4I062l8NqMYi1rUk00zXoFU2lu',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
