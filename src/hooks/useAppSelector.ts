import { RootState } from '@/redux-query/store/store';
import { useSelector, TypedUseSelectorHook } from 'react-redux';


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;