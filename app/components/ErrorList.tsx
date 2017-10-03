import * as React from 'react';

interface IErrorListProps {
  errors: Array<string>;
}

const ErrorList = ({ errors }: IErrorListProps) => (
  <div>
    {errors.length > 0 && (
      <div className="alert alert-danger">
        <ul className="error">
          {errors.map((error: string, i: number) => <li key={i}>{error}</li>)}
        </ul>
      </div>
    )}
  </div>
);

export default ErrorList;
