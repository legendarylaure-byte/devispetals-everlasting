import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface OrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  product: string;
  message?: string;
}

export async function createOrder(data: OrderData) {
  try {
    if (!db) throw new Error('Database not initialized');
    const docRef = await addDoc(collection(db, 'orders'), {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}
