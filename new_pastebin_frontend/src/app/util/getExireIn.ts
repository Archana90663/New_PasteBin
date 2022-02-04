export default function getExpireInText(expire_at: string): string{
    var secondsDiff = (Date.parse(expire_at) - (new Date()).getTime())/1000
    if (secondsDiff > 86400)  { 
      return Math.floor(secondsDiff/86400) + ' Days'
     }
     if (secondsDiff > 3600)  { 
      return Math.floor(secondsDiff/3600) + ' Hours'
     }
     if (secondsDiff > 60)  { 
      return Math.floor(secondsDiff/60) + ' Minutes'
     }
     if (secondsDiff > 0) { 
      return secondsDiff + ' Seconds'
     }
    return ""
  }