import { expect, jest, test } from 'bun:test';
import { greet } from './greet';

test('モック関数は実行された', () => {
	const mockFn = jest.fn();
	mockFn();
	expect(mockFn).toBeCalled();
});

test('モック関数が実行されてない', () => {
	const mockFn = jest.fn();
	expect(mockFn).not.toBeCalled();
});

test('モック関数は実行された回数を記録している', () => {
	const mockFn = jest.fn();
	mockFn();
	expect(mockFn).toBeCalledTimes(1);
	mockFn();
	expect(mockFn).toBeCalledTimes(2);
});

test('モック関数は関数の中でも実行できる', () => {
	const mockFn = jest.fn();
	const greet = (): void => {
		mockFn();
	};
	greet();
	expect(mockFn).toBeCalledTimes(1);
});

test('モック関数は実行時の引数を記録している', () => {
	const mockFn = jest.fn();
	mockFn('TEST');
	expect(mockFn).toBeCalledWith('TEST');
});

test('モック関数はテスト対象の引数として使用出来る', () => {
	const mockFn = jest.fn();
	greet('Taro', mockFn);
	expect(mockFn).toHaveBeenCalledWith('Hello! Taro');
});
