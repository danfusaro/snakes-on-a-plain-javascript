'use strict';
import './style.css';
import { Game } from './js/game';
import { config } from './js/config';

new Game(
  config,
  document.getElementById('app'));