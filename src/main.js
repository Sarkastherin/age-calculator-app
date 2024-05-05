function handleSubmit() {
  const day = document.getElementById('day').value;
  const month = document.getElementById('month').value;
  const year = document.getElementById('year').value;
  let date = new CalculatedDate(year, month, day);
  console.log(date)
  if (date.isValidDate()) {
      let calcDate = date.calculated()
      document.querySelector('.result-text--years').innerText = calcDate.years;
      document.querySelector('.result-text--months').innerText = calcDate.months;
      document.querySelector('.result-text--days').innerText = calcDate.days;
  }
  else {
      let inputYear = document.querySelector('.year-input');
      let inputMonth = document.querySelector('.month-input');
      let inputDay = document.querySelector('.day-input');
      if(!date.isInThePast()) {
          inputYear.classList.add('was-validated')
      }
      else {
          inputYear.classList.remove('was-validated')
      }
      if(!date.isValidMonth()) {
          inputMonth.classList.add('was-validated')
      }
      else {
          inputMonth.classList.remove('was-validated')
      }
      if(!date.isValidDay()) { 
          inputDay.classList.add('was-validated')
      }
      else {
          inputDay.classList.remove('was-validated')
      }
  }

}
class CalculatedDate {
  constructor (year, month, day) {
      this.year = year;
      this.month = month;
      this.day = day;
      this.date = new Date(this.year, this.month - 1, this.day)
  }
  isInThePast() {
      return this.date < new Date()
  }
  isValidMonth() {
      return this.month > 0 && this.month < 13
  }
  isValidDay() {
      let daysOnMonth = new Date(this.year,this.month,0).getDate();
      return this.day <= daysOnMonth
  }
  isValidDate() {
      return this.isValidMonth() && this.isValidDay() && this.isInThePast()
  }
  calculated() {
      let diff = new Date() - this.date;
      let totalDays = diff / (1000*60*60*24);
      let years = totalDays / 365.25;
      let months = (years % 1) * 12
      let days = (months % 1) * 30.4375
      return {years: Math.floor(years), months: Math.floor(months), days: Math.floor(days)}
  }
}