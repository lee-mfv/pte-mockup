export default class UtilHelper {
  static copyToClipboard(id) {
    let el = document.getElementById(id);
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  static toogleClassByAttribute(event, att, menuId, contentId, className) {
    var active = !(event.target.getAttribute(att) === 'true')
    var el_lp_service_list_menu = document.getElementById(menuId);
    var el_lp_service_list = document.getElementById(contentId);
    if(active) {
      el_lp_service_list_menu.classList.add(className)
      el_lp_service_list.classList.add(className)
    } else {
      el_lp_service_list_menu.classList.remove(className)
      el_lp_service_list.classList.remove(className)
    }
    event.target.setAttribute(att, active)
  }
}
