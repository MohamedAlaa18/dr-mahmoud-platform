import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

//Create Exam Validators
export function isAnyValueMissing(control: AbstractControl): { [key: string]: any } | null {
  const startDate = control.get('startDate')?.value;
  const startTime = control.get('startTime')?.value;
  const endDate = control.get('endDate')?.value;
  const endTime = control.get('endTime')?.value;
  const duration = control.get('duration')?.value;

  if (!startDate || !startTime || !endDate || !endTime || !duration) {
    return { 'anyValueMissing': { message: 'your message here' } };
  }

  return null;
}

export function isStartDateBeforeEndDate(control: AbstractControl): { [key: string]: any } | null {
  const startDateValue = control.get('startDate')?.value;
  const startTimeValue = control.get('startTime')?.value;
  const endDateValue = control.get('endDate')?.value;
  const endTimeValue = control.get('endTime')?.value;

  if (typeof startTimeValue !== 'string' || typeof endTimeValue !== 'string') {
    return null;
  }

  const startDate = new Date(startDateValue);
  const [startHours, startMinutes] = startTimeValue.split(':').map(Number);
  let startHoursIn24Format = startHours;

  const isStartPM = startTimeValue.includes('PM');
  if (startHours !== 12 && isStartPM) {
    startHoursIn24Format += 12;
  } else if (startHours === 12 && !isStartPM) {
    startHoursIn24Format = 0;
  }

  startDate.setHours(startHoursIn24Format, startMinutes);

  const endDate = new Date(endDateValue);
  const [endHours, endMinutes] = endTimeValue.split(':').map(Number);
  let endHoursIn24Format = endHours;

  const isEndPM = endTimeValue.includes('PM');
  if (endHours !== 12 && isEndPM) {
    endHoursIn24Format += 12;
  } else if (endHours === 12 && !isEndPM) {
    endHoursIn24Format = 0;
  }

  endDate.setHours(endHoursIn24Format, endMinutes);

  if (startDate > endDate) {
    return { 'startDateBeforeEndDate': { message: 'your message here' } };
  }

  return null;
}

export function isDurationValid(control: AbstractControl): { [key: string]: any } | null {
  const startDateValue = control.get('startDate')?.value;
  const startTimeValue = control.get('startTime')?.value;
  const endDateValue = control.get('endDate')?.value;
  const endTimeValue = control.get('endTime')?.value;
  const durationInMinutes = parseInt(control.get('duration')?.value);

  if (typeof startTimeValue !== 'string' || typeof endTimeValue !== 'string') {
    return null;
  }

  const startDate = new Date(startDateValue);
  const [startHours, startMinutes] = startTimeValue.split(':').map(Number);
  let startHoursIn24Format = startHours;

  const isStartPM = startTimeValue.includes('PM');
  if (startHours !== 12 && isStartPM) {
    startHoursIn24Format += 12;
  } else if (startHours === 12 && !isStartPM) {
    startHoursIn24Format = 0;
  }

  startDate.setHours(startHoursIn24Format, startMinutes);

  const endDate = new Date(endDateValue);
  const [endHours, endMinutes] = endTimeValue.split(':').map(Number);
  let endHoursIn24Format = endHours;

  const isEndPM = endTimeValue.includes('PM');
  if (endHours !== 12 && isEndPM) {
    endHoursIn24Format += 12;
  } else if (endHours === 12 && !isEndPM) {
    endHoursIn24Format = 0;
  }

  endDate.setHours(endHoursIn24Format, endMinutes);

  const startDateTimeInMinutes = startDate.getTime() / 60000;
  const endDateTimeInMinutes = endDate.getTime() / 60000;
  const differenceInMinutes = endDateTimeInMinutes - startDateTimeInMinutes;

  if (differenceInMinutes < durationInMinutes) {
    return { 'durationExceedsDifference': { message: 'Your message here' } };
  }

  return null;
}

export function isStartDateInFuture(control: AbstractControl): { [key: string]: any } | null {
  const startDateValue = control.get('startDate')?.value;
  const startTimeValue = control.get('startTime')?.value;


  if (typeof startTimeValue !== 'string') {
    return null;
  }

  const startDate = new Date(startDateValue);
  const [hours, minutes] = startTimeValue.split(':').map(Number);
  let hoursIn24Format = hours;

  const isPM = startTimeValue.includes('PM');
  if (hours !== 12 && isPM) {
    hoursIn24Format += 12;
  } else if (hours === 12 && !isPM) {
    hoursIn24Format = 0;
  }

  startDate.setHours(hoursIn24Format, minutes);

  const today = new Date();
  if (startDate < today) {
    return { 'startDatePast': { message: 'your message here' } };
  }

  return null;
}

//Student Exam Validators
export function atLeastOneCheckboxChecked(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    let isAtLeastOneChecked = false;
    if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        if (control instanceof FormControl && control.value === true) {
          isAtLeastOneChecked = true;
        }
      });
    }
    return isAtLeastOneChecked ? null : { 'atLeastOneCheckboxChecked': { message: 'your message here' } };
  };
}

export function atLeastOneRadioButtonChecked(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    let isAtLeastOneChecked = false;
    if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        if (control instanceof FormControl && control.value !== null && control.value !== undefined) {
          isAtLeastOneChecked = true;
        }
      });
    }
    return isAtLeastOneChecked ? null : { 'atLeastOneRadioButtonChecked': { message: 'your message here' } };
  };
}
