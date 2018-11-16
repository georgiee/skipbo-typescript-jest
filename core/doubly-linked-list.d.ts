export interface DoublyLinkedListNode<T> {
    value: T;
    next?: DoublyLinkedListNode<T>;
    prev?: DoublyLinkedListNode<T>;
}
/**
 * Linked list for items of type T
 */
export declare class DoublyLinkedList<T> {
    head?: DoublyLinkedListNode<T>;
    tail?: DoublyLinkedListNode<T>;
    _size: number;
    constructor(values?: T[]);
    reset(): void;
    size(): number;
    fromArray(values: any): void;
    /**
     * Adds an item in O(1)
     **/
    add(value: T): void;
    /**
     * FIFO removal in O(1)
     */
    dequeue(): T | undefined;
    /**
     * LIFO removal in O(1)
     */
    pop(): T | undefined;
    /**
     * Returns an iterator over the values
     */
    values(): IterableIterator<T>;
}
