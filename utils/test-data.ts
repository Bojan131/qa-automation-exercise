// In a real project these would come from environment variables or a secrets manager.
// Hardcoded here because this is a public demo site with no real user data.

export function generateUserEmail(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `testuser_${timestamp}_${random}@testmail.com`;
}

export const testUser = {
  name: 'Test User',
  password: 'Test1234!',
  title: 'Mr',
  firstname: 'Test',
  lastname: 'User',
  company: 'TestCorp',
  address1: '123 Test Street',
  address2: '',
  country: 'United States',
  state: 'California',
  city: 'Los Angeles',
  zipcode: '90001',
  mobile_number: '1234567890',
  birth_date: '15',
  birth_month: '6',
  birth_year: '1990',
};

export const cardDetails = {
  nameOnCard: 'Test User',
  cardNumber: '4111111111111111',
  cvc: '123',
  expiryMonth: '12',
  expiryYear: '2028',
};
