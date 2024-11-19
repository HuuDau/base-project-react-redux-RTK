import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux-query/store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;