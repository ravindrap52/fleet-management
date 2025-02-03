import { describe, it, expect } from 'vitest';
import notificationReducer, { addNotification } from '@/features/notifications/notificationSlice';
import { AppNotification } from "@/types/interface";

const initialState = {
  messages: [],
};

describe('notificationSlice', () => {
  it('should add a new notification to the state', () => {
    const newNotification: AppNotification = {
      id: '1',
      message: 'New notification',
      type: 'info',
      timeStamp: "1234"
    };

    const action = addNotification(newNotification);
    const nextState = notificationReducer(initialState, action);

    expect(nextState.messages).toHaveLength(1);
    expect(nextState.messages[0]).toEqual(newNotification);
  });
});
