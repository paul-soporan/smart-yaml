import type { Collection } from 'yaml/types';
import type { Updater } from './makeUpdater';

/**
 * Preserves the ordering of the original collection node.
 *
 * If an item from the updated node is missing in the original node,
 * it will be moved to the end of the resulting node.
 */
export function preserveOriginalCollectionOrdering<T extends typeof Collection>(
  updater: Updater<T>,
  updatedCollection: InstanceType<T>,
): void {
  const { shallowOriginalClone } = updater;

  if (!(shallowOriginalClone instanceof updater.structure)) {
    return;
  }

  updatedCollection.items.sort((a, b) => {
    const indexOfA = shallowOriginalClone.items.indexOf(a);
    const indexOfB = shallowOriginalClone.items.indexOf(b);

    // Non-original items go to the end of the `items` array
    if (indexOfA === -1 && indexOfB === -1) return 0;
    if (indexOfA === -1) return 1;
    if (indexOfB === -1) return -1;

    return indexOfA - indexOfB;
  });
}
