import {VNode} from 'vue';

export type RenderProps = {
  render: () => VNode;
};
export const render = (props: RenderProps) => props.render();
export default render;
