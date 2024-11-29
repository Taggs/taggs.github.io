import { useEffect } from 'react';

export default function BookingButton() {
  useEffect(() => {
    // Load Google Calendar CSS
    const link = document.createElement('link');
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Google Calendar Script
    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize the scheduling button
    script.onload = () => {
      window.calendar.schedulingButton.load({
        url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ILpNje3GXWbgDmLl6nqgN-KnztM5kW4IftiYcGdWgITQVsqOKuOZdVKXwb_R5XU-3p8rAhLTC?gv=true',
        color: '#42d694',
        label: "Book a call",
        target: document.getElementById('booking-button-container'),
      });
    };

    // Cleanup
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return <div id="booking-button-container" />;
}
