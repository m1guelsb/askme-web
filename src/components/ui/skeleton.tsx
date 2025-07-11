import { cloneElement, type ReactElement } from 'react';

interface SkeletonProps {
  isLoading: boolean;
  element: ReactElement;
  quantity?: number;
}

export const Skeleton = ({
  element,
  isLoading,
  quantity = 10,
}: SkeletonProps) => {
  return (
    <>
      {isLoading &&
        Array.from({ length: quantity }).map(() =>
          cloneElement(element, { key: Math.random() })
        )}
    </>
  );
};
