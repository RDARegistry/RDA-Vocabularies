---
title: RDA Vocabularies release v2.6.0
author: Gordon Dunsire
date: 2016-12-28 17:00:00
categories: RDA_Registry Translations Library_Reference_Model 4-fold_Path
---

We just released [v2.6.0 of the RDA Vocabularies](https://github.com/RDARegistry/RDA-Vocabularies/releases/tag/v2.6.0) on GitHub.

This release includes minor amendments to property labels and definitions to reflect changes in RDA Toolkit for consistency and clarity. Indefinite articles ("a", "an") are preferred over the definite article ("the") in property definitions and scope notes. The term "resource" is replaced with the label of a specific RDA entity where appropriate in property definitions and scope notes.

Another minor amendment replaces the standard phrase "person, family, or corporate body" with "agent" in property definitions and scope notes. One of the [Outcomes of the 2016 RSC Meeting](http://www.rda-rsc.org/sites/all/files/RSC-Outcomes-2016.pdf) in Frankfurt, Germany, is to adopt the IFLA Library Reference Model (LRM). The LRM is in its final stages of approval as a standard by the International Federation of Library Associations and institutions (IFLA). The RDA Steering Committee (RSC) has been monitoring its development closely.

The LRM includes an entity **Agent** that is a super-entity of the entities **Person** and **Collective Agent**. Collective Agent, in turn, encompasses the current RDA entities **Corporate Body** and **Family**. This amendment is part of the development of RDA vocabularies to align with the LRM.

New LRM entities have been added to the [RDA Classes](http://www.rdaregistry.info/Elements/c/) element set:

* [Collective Agent](http://rdaregistry.info/Elements/c/C10011)
* [Nomen](http://rdaregistry.info/Elements/c/C10012)
* [Time-span](http://rdaregistry.info/Elements/c/C10010)

A super-entity for all other RDA entities has also been added:

* [RDA Entity](http://rdaregistry.info/Elements/c/C10013)

[Class hierarchies](http://www.rdaregistry.info/rgAbout/rdaont/ontHierarchies.html) has more information.

A second significant outcome of the RSC meeting is the development of the structure and functionality of RDA Toolkit in the 3R Project. This includes the [4-fold path](http://www.rdaregistry.info/rgAbout/rdaont/ont4fold.html) for recording related entity instance data with literals (strings) or URIs (things).

[3R Project: Update from 2016 Frankfurt Meeting](http://www.rda-rsc.org/3Rprojectupdate) has further information.

Release v2.6.0 includes OWL datatype and object property element sets that extend the "canonical" RDA element sets to accommodate instance data specifically as a literal with a datatype property or as a URI with an object property. 

[Datatype and object element sets](http://www.rdaregistry.info/rgAbout/rdaont/ontDataObj.html) has more information.

The extensions use a simple pattern for deriving the namespace and property URIs that we hope is easy to use in applications. The canonical, datatype, and object properties form a group or family of element sets.

[Element set families](http://www.rdaregistry.info/rgAbout/rdaont/ontESFamilies.html) has more information.

**Warning**: We have also moved the declarations of range classes and inverse properties from the canonical element sets to the object property element sets.

This is the reason for incrementing the middle part of the semantic version number: moving ranges and inverses does not break backwards compatibility with the canonical properties, but applications that use the data require amendment to change the source from canonical to object property URI. This is a simple substition in the URI string. A semantic chain from canonical property to object property is available via sub-property (specialized as parent property) links.

We expect to add to the object property element sets during the 3R Project. The LRM allows most of the distinguising elements of an entity to be treated as attributes with datatype values or relationships with object values, so the number of properties in the canonical, datatype, and object element sets in each family will become closer.

Release v2.6.0 also adds a set of high-level, coarse granularity super-properties to each entity element set to relate the entity to every other RDA entity.

[Relationship matrix](http://www.rdaregistry.info/rgAbout/rdaont/ontRelMatrix.html) has more information.

The release includes the start of a Swedish translation of RDA Reference.

Translators and developers who wish to add new RDA translations of RDA Reference to the OMR can now use the beta infrastructure at [RDA Reference: Translations](http://www.rdaregistry.info/rgAbout/rdaref/translations/)

Gordon Dunsire
