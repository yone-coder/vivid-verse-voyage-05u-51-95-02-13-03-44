
# Node.js Backend

This directory contains the Express.js backend server that powers the payment API.

## Structure
- `server.js`: Main Express server entry point
- `routes/`: API route definitions
- `controllers/`: API endpoint handlers

## Running the server
Install dependencies and start the server:

```bash
cd backend/nodejs
npm install
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### Create Payment
- **URL**: `/api/payment/create-payment`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "amount": "100",
    "currency": "USD",
    "paymentMethod": "credit-card",
    "developmentMode": true
  }
  ```

### Get Payment Status
- **URL**: `/api/payment/status/:id`
- **Method**: `GET`
