import { Notification } from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
  const id = req.userId;
  if (!id) return res.status(400).json({ success: false, message: 'User id is required' });

  try {
    const notifications = await Notification.find({ user: id, isRead: false })
      .populate('user', 'stageName email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, message: 'All notifications', notifications });
  } catch (error) {
    console.log('Error fetching notifications:', error.message);
    res.status(500).json({ success: false, message: 'Could not fetch notifications' });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.body;
  if (!notificationId) return res.status(400).json({ success: false, message: 'Notification id is required' });

  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    console.log('Error marking notification as read:', error.message);
    res.status(500).json({ success: false, message: 'Could not mark notification as read' });
  }
};
