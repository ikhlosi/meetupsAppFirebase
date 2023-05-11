/**
 * In this file I create 2 custom hooks: useAppDispatch and useAppSelector.
 * Both hooks will replace respectively useDispatch and useSelector throughout the app.
 *
 * More info about them below.
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

// Defining the type that our custom `useAppDispatch` hook will be: take no parameters and return something of type `AppDispatch` from the store
type DispatchFunc = () => AppDispatch;

// Wrapping useDispatch hook with our custom hook: `useAppDispatch`. That's because our custom hook will handle thunks and other middleware
export const useAppDispatch: DispatchFunc = useDispatch;

// Wrapping `useSelector` hook with our custom `useAppSelector` hook such that we get typed state when we use our custom hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
