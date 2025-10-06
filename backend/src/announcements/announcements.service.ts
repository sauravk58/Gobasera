import { Injectable } from '@nestjs/common';
import { Announcement, Status } from './types';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementStatusDto } from './dto/update-status.dto';

@Injectable()
export class AnnouncementsService {
  private announcements: Announcement[] = [];

  create(dto: CreateAnnouncementDto): Announcement {
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.announcements.push(newAnnouncement);
    return newAnnouncement;
  }

  findAll(): Announcement[] {
    return [...this.announcements].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  updateStatus(id: string, dto: UpdateAnnouncementStatusDto): Announcement | undefined {
    const ann = this.announcements.find(a => a.id === id);
    if (ann && ['active', 'closed'].includes(dto.status)) {
      ann.status = dto.status;
    }
    return ann;
  }
}