import './assets/less/select.less';
import { utils } from './assets/scripts/utils';

window.onload = () => {
  let $selects = document.querySelectorAll('.select');
  let timerRemoveActive = new Array($selects.length);

  $selects.forEach(($select, index) => {
    let $text = $select.querySelector('.select-text');
    // click dropdown item
    $select.addEventListener('click', e => {
      let $target = e.target;
      let value = null;
      let text = null;

      if (utils.hasClass($target, 'dropdown-item')) {
        value = $target.getAttribute('data-value') || '';
        text = $target.innerText || '';

        let $selectWrapper = $target.parentNode.parentNode;
        let $input = $selectWrapper.querySelector('.select-input');
        let $text = $selectWrapper.querySelector('.select-text');

        $input.value = value.trim();
        $text.value = text.trim();
      }
    })

    // search handle
    if (utils.hasClass($select, 'search')) {
      $select.addEventListener('input', e => {
        let $target = e.target;

        if (utils.hasClass($target, 'select-text')) {
          let $selectWrapper = $target.parentNode;
          let keyword = $target.value.trim();
          let $dropdownItem = $selectWrapper.querySelectorAll('.select-dropdown .dropdown-item');

          $dropdownItem.forEach($item => {
            let text = $item.innerText.trim();

            if (text.indexOf(keyword) > -1) {
              utils.removeClass($item, 'hidden');
            } else {
              utils.addClass($item, 'hidden');
            }
          })
        }
      })
    }

    // text focus add active class 
    $text.addEventListener('focus', function (e) {
      clearTimeout(timerRemoveActive[index]);

      let $selectWrapper = this.parentNode;
      utils.addClass($selectWrapper, 'active');
    })

    // text blur remove active class 
    $text.addEventListener('blur', function (e) {
      let text = this.value || '';
      let $selectWrapper = this.parentNode;
      let $input = $selectWrapper.querySelector('.select-input');
      let $dropdownItem = $selectWrapper.querySelectorAll('.select-dropdown .dropdown-item');
      let isMatched = false;

      $dropdownItem.forEach($item => {
        let currentText = $item.innerText || '';
        // 搜索匹配时自动赋值
        if (currentText.trim() === text.trim()) {
          let value = $item.getAttribute('data-value') || '';

          isMatched = true;
          $input.value = value.trim();
        }
      })

      // 匹配的值则清除输入和原始默认值
      if (!isMatched) {
        this.value = '';
        $input.value = '';
        timerRemoveActive[index] = setTimeout(() => {
          utils.removeClass($selectWrapper, 'active');

          $dropdownItem.forEach($item => {
            // 清除类hidden
            utils.removeClass($item, 'hidden');
          })
        }, 300)
      } else {
        timerRemoveActive[index] = setTimeout(() => {
          utils.removeClass($selectWrapper, 'active');
        }, 300)
      }
    })

    // text on press enter => preventDefault and dispatch event blur
    $text.addEventListener('keydown', function (e) {
      if (e.code === 'Enter') {
        e.preventDefault();
        // dispatch event blur
        this.blur();
      }
    })
  })
}