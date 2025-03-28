import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

interface UpdateItem {
  emoji: string;
  text: string;
}

interface Announcement {
  id: number;
  title: string;
  content: UpdateItem[];
  date: string;
}

const SideAnnouncement: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const announcementRef = useRef<HTMLDivElement>(null);
  const [announcements] = useState<Announcement[]>([
    {
      id: 4,
      title: 'V1.2.4 版本更新',
      content: [
        { emoji: '✨', text: '新增假期倒计时' },
        { emoji: '✨', text: '聊天室支持 shift + enter 换行' },
        { emoji: '✨', text: '优化注册，使用邮箱验证码注册' },
        { emoji: '✨', text: '新增音乐播放器' },
      ],
      date: '2025-03-19',
    },
    {
      id: 5,
      title: 'V1.2.5 版本更新',
      content: [
        { emoji: '✨', text: '新增五子棋简易聊天框' },
        { emoji: '✨', text: '新增播放器隐藏按钮' },
      ],
      date: '2025-03-20',
    },
    {
      id: 6,
      title: 'V1.2.6 版本更新',
      content: [
        { emoji: '✨', text: '优化五子棋在线对战' },
        { emoji: '✨', text: '机器人模式改变，海龟汤改为问答助手' },
      ],
      date: '2025-03-22',
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isCollapsed &&
        announcementRef.current &&
        !announcementRef.current.contains(event.target as Node)
      ) {
        setIsCollapsed(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      ref={announcementRef}
      className={classNames(styles.sideAnnouncement, {
        [styles.collapsed]: isCollapsed,
      })}
    >
      <div className={styles.toggleButton} onClick={toggleCollapse}>
        {isCollapsed ? '➡️' : '⬅️'}
      </div>
      <Card
        title="更新公告"
        className={styles.card}
        bordered={false}
      >
        {announcements.map((announcement) => (
          <div key={announcement.id} className={styles.announcementItem}>
            <div className={styles.header}>
              <h3>{announcement.title}</h3>
              <span className={styles.date}>{announcement.date}</span>
            </div>
            <ul className={styles.updateList}>
              {announcement.content.map((item, index) => (
                <li key={index}>
                  <span className={styles.emoji}>{item.emoji}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default SideAnnouncement;
