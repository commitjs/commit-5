import { directive, AttributePart, EventPart, NodePart } from "lit-html";

const container = {
  collection: new WeakMap(),
  subs: new WeakMap(),
  set(dir: any, element: any) {
    this.collection.set(dir, element);
    const currentSubs = this.subs.get(dir) || [];
    currentSubs.forEach((fn: any) => fn(element));
  },
  subscribe: function (dir: any, fn: any) {
    const currentSubs = this.subs.get(dir) || [];
    this.subs.set(dir, currentSubs.concat(fn));
    const data = this.collection.get(dir);
    if (data) { fn(data); }
  }
}

export function creacteRef() {
  const dir = directive(() => (part: AttributePart) => {
    container.set(dir, part.committer.element);
  })();
  return dir;
}

export const useRef = <T>(dir: any): T => container.collection.get(dir);

const state = new WeakMap();

export const bindRef = directive((dir: any) => (node: AttributePart) => {
  const existingDirective = state.get(node);
  if (existingDirective === dir) { return; }
  state.set(node, dir);
  container.subscribe(dir, (data: any) => {
    node.setValue(data);
    node.commit();
  });
});
