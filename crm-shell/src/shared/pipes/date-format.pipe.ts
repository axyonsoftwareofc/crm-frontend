// src/shared/pipes/date-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | null | undefined, format: string = 'medium'): string {
    if (!value) return '';

    const datePipe = new DatePipe('pt-BR');

    const formats: {[key: string]: string} = {
      'short': 'dd/MM/yyyy',
      'medium': 'dd \'de\' MMMM \'de\' yyyy',
      'long': 'dd \'de\' MMMM \'de\' yyyy, HH:mm',
      'timeago': this.getTimeAgo(value)
    };

    return datePipe.transform(value, formats[format] || format) || '';
  }

  private getTimeAgo(value: Date | string): string {
    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'agora há pouco';
    if (diffMins < 60) return `há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays === 1) return 'ontem';
    if (diffDays < 7) return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
    if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
    if (diffDays < 365) return `há ${Math.floor(diffDays / 30)} mês${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`;

    return `há ${Math.floor(diffDays / 365)} ano${Math.floor(diffDays / 365) > 1 ? 's' : ''}`;
  }
}
