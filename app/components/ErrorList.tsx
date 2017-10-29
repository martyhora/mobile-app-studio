import * as React from 'react';

interface IErrorListProps {
  header?: string;
  errors: Array<string>;
}

const ErrorList = ({ header, errors }: IErrorListProps) => (
  <div>
    {errors.length > 0 && (
      <div className="alert alert-danger">
        {header && (
          <h4>
            <i className="icon fa fa-ban" /> {header}
          </h4>
        )}

        {errors.map((error: string, i: number) => <span key={i}>{error}</span>)}
      </div>
    )}
  </div>
);

export default ErrorList;
