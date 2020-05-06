---
title: Questions fréquentes
description: Questions fréquemment posées, au sujet de Misskey.
layout: wiki
has_child: false
rank: 1
prev: /wiki/first
next: /wiki/usage
---
Questions fréquemment posées, au sujet de Misskey. 
[La terminologie est expliquée ici](first).

## Questions fréquentes
### Quelles sont les différences entre les fils d'actualité : "Principal", "Local", "Social", et "Global" ?
Chaque partie affiche les utilisateurs différements.

| Fil d'actualité | Utilisateurs affichés |
|--:|:--|
| **Principal** | Les utilisateurs que l'on suit |
| **Local** | Tous les utilisateurs de l'instance |
| **Social** | Principal et Local |
| **Global** | Tous les utilisateurs reconnus par l'instance, utilisateurs distants inclus. |

Même chose pour les [paramètres de visibilité des messages](usage/post#公開範囲を設定する).
**[→ Savoir utiliser: Le fil d'actualité](usage/timelines)**

### C'est lent.
Misskey Web utilise beaucoup d'animations, ce qui peut provoquer des ralentissements, voire des blocages complets des onglets, sur de petites machines.
Dans ce cas de figure, vous pouvez essayer d'activer "Réduire l'animation de l'interface", afin de retirer les animations assez lourdes.

### Qui gère ça ? Quelles sont les conditions d'utilisation ?
Pour ce qui est de misskey.io précisément, cette partie est administrée par le développeur syuilo, et les serveurs sont fournis par 村上 de Hokkaido. Les conditions d'utilisation de cette plateforme sont précisées dans les liens placés dans le panneau de widgets, et vous êtes priées de les lire.

Maintenant, Misskey étant un logiciel libre, toute personne, physique ou morale, ayant les compétences et ressources suffisantes, peut mettre en place et gérer sa propre instance. Ainsi, chaque instance a généralement des conditions d'utilisations différentes, ou du moins, chaque pays dans lesquels sont présents ces instances imposent des règles différentes. 

Dans l'instance que vous utilisez, le compte administrateur de l'instance a un badge rouge "Admin".

### Misskey, c'est une instance de Mastodon ?
**[Non](../blog/2018/08/17_1_misskeyisnotmastodon)**。  
Ce n'est pas non plus une interface différente avec le même moteur.
Le seul lien entre Misskey et Mastodon est l'interconnexion via ActivityPub. C'est tout.

### On peut relier Misskey avec Mastodon ?
Ça dépend de ce que vous entendez par "relier". Les utilisateurs d'instances Mastodon et Misskey peuvent s'échanger des notes, ou toot, et se suivre les uns les autres.

Un utilisateur de Misskey peut suivre un utilisateur de Mastodon. Inversement, un utilisateur de Mastodon peut suivre un utilisateur de Misskey. Ils peuvent aussi rajouter des réactions, ou Booster, les notes de chacun.

Les utilisateurs de Misskey et Mastodon peuvent aussi communiquer avec des instances utilisant d'autres programmes, comme si ils utilisaient le même service.

### Je reçois des alertes qui ne me concernent pas.
Vous avez peut être activé la fonctionnalité "Surveillance automatique des notes"
Si vous n'avez pas besoin de cette fonctionnalité, allez dans `Paramètres du compte` > `Général` puis désactivez "Surveiller automatique pour les notes".
**[→ Savoir utiliser: La surveillance des envois](usage/watch)**

### Comment fait-on pour mettre forme les caractères, animer les mots, faire des fenêtres de recherche, ... ?
Utilisez la syntaxe propre à Misskey : "Misskey Flavored Markdown (MFM)" (Markdown parfumé au Misskey).  
**[→ Savoir utiliser: La mise en forme des caractères (MFM)](usage/mfm)**

### Pourquoi y'a des oreilles de chat qui me sont poussées, et je me mets à parler comme un chat ? C'est quoi le mode Chat ?
**Le mode Chat** est l'une des fonctionnalités étrange de Misskey.
Cela fait pousser des Nekomimi sur votre icône, et remplace chaque *な* par *にゃ*.

Le mode Chat est configurable dans les paramètres du compte, et se voit aussi dans les autres instances Misskey.

### Y'a un truc bizarre.
Veuillez d'abord jeter un oeil à la page ["En cas de problèmes"](troubles), qui liste des problèmes connus avec Misskey ainsi que leurs solutions, ou palliatifs.
Si vous ne trouvez pas de solution au problème que vous rencontrez, passez à la question suivante.

### J'ai repéré une anomalie. Ça serait bien si il y avait telle fonctionnalité.
Pour les utilisateurs de **Github**, veuillez d'abord vérifier dans la section "Issues", qu'un rapport contenant le même problème n'existe pas déjà. Si vous n'en avez pas trouvé, nous vous prions de créer un [nouveau rapport d'anomalie](https://github.com/syuilo/misskey/issues/new/choose). 
Les PullRequest sont bien évidemment appréciées.

Pour les gens qui ont du mal avec l'anglais (NdT et ont un bon niveau de Japonais), ou pour ceux qui ne comprennent pas vraiment comment utiliser Github, vous pouvez envoyer un message à `@joinmisskey@misskey.io`.

### Je voudrais soutenir le projet Misskey.
Vous pouvez le faire via Patreon（service de mécénat）ou via la liste d'envies Amazon. Les liens étant présents **[ici (Section basse de haut de la page)](../#section_7)**.

### J'ai oublié le mot de passe de mon compte.
Contactez l'administrateur de votre instance par email, ou en créant un autre compte.
Une fois que l'administrateur aura vérifié que le compte dont vous parlez vous appartient bien, celui-ci en changera le mot de passe du compte et vous le communiquera.
Une fois connecté avec le nouveau mot de passe, changez-le immédiatement et faites en sorte de ne plus le perdre.

### Je n'arrive pas à me déconnecter.
Essayez de supprimer les cookies et les données de sites.
