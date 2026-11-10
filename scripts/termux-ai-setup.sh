#!/data/data/com.termux/files/usr/bin/bash
set -Eeuo pipefail

say() { printf '\n%s\n' "$*"; }
fail() { printf 'Erro: %s\n' "$*" >&2; exit 1; }

[ -n "${PREFIX:-}" ] && [ -x "$PREFIX/bin/pkg" ] || fail 'Execute no Termux, não no Debian/proot.'
command -v proot-distro >/dev/null || {
  say 'Instalando proot-distro...'
  pkg update -y
  pkg install -y proot-distro
}

cat <<'MENU'
Instalar no Debian (proot):
  1) Codex CLI
  2) Claude Code (baixar instalador para revisão)
  3) Ambos
  4) Apenas preparar Debian
MENU
read -r -p 'Escolha [1-4]: ' choice
case "$choice" in 1|2|3|4) ;; *) fail 'Opção inválida' ;; esac

if ! proot-distro list --installed 2>/dev/null | grep -Eq '(^|[[:space:]])debian([[:space:]]|$)'; then
  say 'Instalando Debian...'
  proot-distro install debian
fi

say 'Preparando Debian...'
proot-distro login debian -- bash -s <<'DEBIAN'
set -Eeuo pipefail
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y ca-certificates curl git bash build-essential nodejs npm
printf 'Node: '; node --version
printf 'npm: '; npm --version
DEBIAN

if [ "$choice" = 1 ] || [ "$choice" = 3 ]; then
  say 'Instalando Codex CLI pelo npm oficial...'
  proot-distro login debian -- bash -lc 'set -e; npm install -g @openai/codex; codex --version' || printf 'Codex não iniciou. Confira versão do Node e arquitetura.\n' >&2
fi

if [ "$choice" = 2 ] || [ "$choice" = 3 ]; then
  say 'Baixando instalador oficial Claude Code para revisão...'
  proot-distro login debian -- bash -lc 'set -e; curl -fsSL https://claude.ai/install.sh -o /tmp/claude-install.sh; echo "Revise: /tmp/claude-install.sh"; head -n 12 /tmp/claude-install.sh; echo "Depois execute: bash /tmp/claude-install.sh"'
fi

say 'Concluído. Acesse: proot-distro login debian'
say 'Use codex login ou claude após instalar. Não coloque tokens em scripts públicos.'
