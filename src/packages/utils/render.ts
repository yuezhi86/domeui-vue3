import {VNode} from 'vue';

type RenderProps = {
  render: () => VNode;
};
export const render = (props: RenderProps) => props.render();
