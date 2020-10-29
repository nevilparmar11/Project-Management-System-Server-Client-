import { Meta, Story } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

export default {
  title: 'Components/Avatar',
  component: AvatarComponent
} as Meta;

const avatarUrl =
  'https://drive.google.com/file/d/133GqtpM39JqWCC01EGVzEmS8CrXbkb4d/view?usp=sharing';

const Template: Story<AvatarComponent> = (args: AvatarComponent) => ({
  component: AvatarComponent,
  props: args
});

export const Rounded: Story<AvatarComponent> = Template.bind({});
Rounded.args = {
  avatarUrl: avatarUrl,
  size: 64
};

export const Square: Story<AvatarComponent> = Template.bind({});
Square.args = {
  avatarUrl: avatarUrl,
  size: 64,
  rounded: false
};
