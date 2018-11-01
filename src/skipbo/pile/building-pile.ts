import { DoublyLinkedList } from "../../core/doubly-linked-list";
import { Card } from "../card";
import { assert } from "../../utils";
import { AbstractPile } from "./pile-abstract";

export enum PileRole {
  BUILDING = 1, DISCARDING
}

export class BuildingPile extends AbstractPile {
  constructor() {
    super(PileRole.BUILDING);
  }
  
}
