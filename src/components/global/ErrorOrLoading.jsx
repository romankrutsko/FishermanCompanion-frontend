import React from 'react';

const ErrorOrLoading = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error?.response?.data?.message || error?.response?.data?.error) {
    return (
      <div className="flex items-center justify-center mt-2 mb-2">
        <div className="bg-red-500 text-white font-bold rounded-lg border shadow-lg p-2 text-justify">
          {error?.response?.data?.message || error?.response?.data?.error}
        </div>
      </div>
    );
  }

  return null;
};

export default ErrorOrLoading;
