import React, { useState, useRef } from 'react';
import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields,
} from '@paypal/react-paypal-js';
import axios from 'axios';

const SubmitPayment = ({ clientToken }) => {
  const [paying, setPaying] = useState(false);
  const cardHolderName = useRef(null);
  const hostedFields = usePayPalHostedFields();

  const handleClick = async () => {
    if (!hostedFields || !cardHolderName.current?.value) {
      alert('Please fill out all fields');
      return;
    }

    setPaying(true);
    try {
      const { data } = await axios.post('https://paypal-with-nodejs.onrender.com/api/paypal/capture-order', {
        orderID: hostedFields.orderId,
      });
      alert('Payment successful!');
      console.log(data);
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setPaying(false);
    }
  };

  return (
    <>
      <label>
        Cardholder Name
        <input ref={cardHolderName} type="text" placeholder="Full name" />
      </label>
      <button onClick={handleClick} disabled={paying}>
        {paying ? 'Processing...' : 'Pay'}
      </button>
    </>
  );
};

const PaymentForm = () => {
  const [clientToken, setClientToken] = useState(null);

  React.useEffect(() => {
    // Fetch client token from backend
    axios
      .get('https://paypal-with-nodejs.onrender.com/api/paypal/client-token')
      .then((response) => setClientToken(response.data.clientToken))
      .catch((error) => console.error('Error fetching client token:', error));
  }, []);

  if (!clientToken) return <div>Loading...</div>;

  return (
    <PayPalScriptProvider
      options={{
        'client-id': 'your_client_id',
        'data-client-token': clientToken,
        components: 'hosted-fields',
        currency: 'USD',
      }}
    >
      <PayPalHostedFieldsProvider
        createOrder={async () => {
          const { data } = await axios.post('https://paypal-with-nodejs.onrender.com/api/paypal/create-order');
          return data.orderID;
        }}
      >
        <PayPalHostedField
          id="card-number"
          hostedFieldType="number"
          options={{ selector: '#card-number', placeholder: 'Card Number' }}
        />
        <PayPalHostedField
          id="cvv"
          hostedFieldType="cvv"
          options={{ selector: '#cvv', placeholder: 'CVV' }}
        />
        <PayPalHostedField
          id="expiration-date"
          hostedFieldType="expirationDate"
          options={{ selector: '#expiration-date', placeholder: 'MM/YY' }}
        />
        <SubmitPayment clientToken={clientToken} />
      </PayPalHostedFieldsProvider>
    </PayPalScriptProvider>
  );
};

export default PaymentForm;