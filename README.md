# Comment utiliser l'authentification Firebase dans un worker

Exemple avec le strict minimum pour fonctionner.

## Dépendances

- Utilisation de `Vue` pour l'UI (mais n'importe quel autre framework fait l'affaire) accompagné de ses copains `Vue-Router` et `Vuex`.
- `Comlink` pour avoir une interface de communication plus sympa entre le thread principal et les workers.
- `Worker-loader` pour webpack.
- `Firebase` (forcément).

## Installation

- Structure standard d'un projet `Vue` avec `Vue CLI`.
- Claquer un `yarn install` (après un `degit` si ça vous chante).
- Activer l'authentification par `email/password` au niveau d'un projet Firebase.
- Ajouter un utilisateur depuis la console de Firebase.
- Récupérer les informations Firebase et les inscrire dans le fichier `.env`.

## Explications

- La config webpack se trouve dans le fichier `vue.config.js`. Elle permet de bundler un fichier pour le worker et de le rafraîchir pour HMR.
- Une phase d'authentification est effectuée pour vérifier si l'utilisateur est déjà connecté. Si oui, il est redirigé directement vers la home sinon vers le login.
- Le worker charge firebase pour alléger et éviter d'encombrer le thread de l'interface.