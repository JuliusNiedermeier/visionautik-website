export default (context, inject) => {
  const currency = (amount) => {
    return new Intl.NumberFormat(context.app.i18n.locale, {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  }

  const date = (date) => {
    return new Intl.DateTimeFormat(context.app.i18n.locale, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date)
  }

  const time = (date) => {
    return new Intl.DateTimeFormat(context.app.i18n.locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date)
  }
  const plugin = { currency, date, time }
  inject('intlFormatter', plugin)
  context.$intlFormatter = plugin
}
