import {VNode} from 'vue';

type RenderProps = {
  render: () => VNode;
};
export default (props: RenderProps) => props.render();
