export type Result<T, E> =
	| {
			ok: true;
			value: T;
			error: undefined;
	  }
	| {
			ok: false;
			value: undefined;
			error: E;
	  };

export function Ok<T, E>(value: T): Result<T, E> {
	return {
		ok: true,
		value,
		error: undefined,
	};
}

export function Err<T, E>(error: E): Result<T, E> {
	return {
		ok: false,
		error,
		value: undefined,
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
