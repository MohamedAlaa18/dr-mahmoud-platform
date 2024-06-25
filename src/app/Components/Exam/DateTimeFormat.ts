export const convertDateFormat = (originalDateString: string): string => {
  const originalDate = new Date(originalDateString);

  const year: number = originalDate.getFullYear();
  const month: string = String(originalDate.getMonth() + 1).padStart(2, '0');
  const day: string = String(originalDate.getDate()).padStart(2, '0');

  const convertedDate: string = `${year}-${month}-${day}`;

  return convertedDate;
}

export const convertTimeFormat = (originalTimeString: string): string => {
  // Split the original time string into hours, minutes, and possibly seconds and AM/PM indication
  const [timePart, amPmPart] = originalTimeString.split(' ');
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  // Adjust hours according to AM/PM indication
  let adjustedHours = hours;
  if (amPmPart) {
    if (amPmPart.toLowerCase() === 'pm' && hours < 12) {
      adjustedHours += 12;
    } else if (amPmPart.toLowerCase() === 'am' && hours === 12) {
      adjustedHours = 0;
    }
  }

  // Create a new Date object and set hours, minutes, and seconds
  const newDate = new Date();
  newDate.setUTCHours(adjustedHours, minutes, seconds || 0); // Use setUTCHours to set the UTC time

  // Get the new time in the desired format (hh:mm:ss.SSSZ)
  const newTimeString = newDate.toISOString().substr(11, 12) + 'Z';
  return newTimeString;
}
