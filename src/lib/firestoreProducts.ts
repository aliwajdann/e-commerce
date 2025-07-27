import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function updateProduct(id: string, data: any) {
  const ref = doc(db, 'products', id);
  await updateDoc(ref, data);
}

export async function deleteProduct(id: string) {
  const ref = doc(db, 'products', id);
  await deleteDoc(ref);
}
