declare module 'tinacms/dist/edit-state' {
    import { FC } from 'react';
    export const TinaEditProvider: FC<{ showInProduction?: boolean }>;
    export function useTina<T>(props: T): T;
}
  