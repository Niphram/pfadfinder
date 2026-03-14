export type OkResult<T> = {
	ok: true;
	value: T;
	error?: never;
};

export type ErrResult<E> = {
	ok: false;
	error: E;
	value?: never;
};

export type Result<T, E> = OkResult<T> | ErrResult<E>;

export function Ok<T, E>(value: T): Result<T, E> {
	return {
		ok: true,
		value,
	};
}

export function Err<T, E>(error: E): Result<T, E> {
	return {
		ok: false,
		error,
	};
}

export function iteratorResultToResult<T, E>(
	iresult: IteratorResult<E, T>,
): Result<T, E> {
	if (iresult.done) {
		return Ok(iresult.value);
	} else {
		return Err(iresult.value);
	}
}
